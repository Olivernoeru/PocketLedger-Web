from flask import Flask, render_template, request, redirect, url_for, flash
import mysql.connector

app = Flask(__name__)
app.secret_key = 'pocketledger_secret'

# Filter Custom untuk format Rupiah
@app.template_filter('rupiah')
def format_rupiah(value):
    if value is None:
        return "0"
    return f"{value:,}".replace(",", ".")

def get_db():
    return mysql.connector.connect(
        host="localhost", user="root", passwd="", database="pocketledger_db", autocommit=True
    )

def hitung_saldo(cursor):
    cursor.execute("SELECT SUM(nominal) as total FROM tb_transaksi WHERE tipe='pemasukan'")
    pemasukan = cursor.fetchone()['total'] or 0
    cursor.execute("SELECT SUM(nominal) as total FROM tb_transaksi WHERE tipe='pengeluaran'")
    pengeluaran = cursor.fetchone()['total'] or 0
    return pemasukan - pengeluaran

@app.route('/')
def index():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    saldo = hitung_saldo(cursor)
    
    cursor.execute("SELECT * FROM tb_transaksi ORDER BY id_transaksi DESC")
    transaksi = cursor.fetchall()
    
    data_edit = None
    edit_id = request.args.get('edit_id')
    if edit_id:
        cursor.execute("SELECT * FROM tb_transaksi WHERE id_transaksi = %s", (edit_id,))
        data_edit = cursor.fetchone()
        if not data_edit:
            flash("Data tidak ditemukan.", "error")
            return redirect(url_for('index'))
            
    cursor.close()
    db.close()
    return render_template('index.html', saldo=saldo, transaksi=transaksi, data_edit=data_edit)

@app.route('/simpan', methods=['POST'])
def simpan():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    id_transaksi = request.form.get('id_transaksi')
    tipe = request.form['tipe']
    nominal_str = request.form['nominal']
    
    if not nominal_str.isdigit() or int(nominal_str) <= 0:
        flash("Nominal harus berupa angka dan lebih dari 0!", "error")
        return redirect(url_for('index'))
        
    nominal = int(nominal_str)
    kategori = request.form['kategori'] if tipe == 'pengeluaran' else 'Pemasukan'

    if not id_transaksi:
        saldo_sekarang = hitung_saldo(cursor)
        
        if tipe == 'pengeluaran' and nominal > saldo_sekarang:
            flash("Saldo tidak mencukupi untuk pengeluaran ini!", "error")
            return redirect(url_for('index'))
            
        cursor.execute(
            "INSERT INTO tb_transaksi (tipe, nominal, kategori) VALUES (%s, %s, %s)",
            (tipe, nominal, kategori)
        )
        flash("Transaksi berhasil ditambahkan.", "success")

    else:
        cursor.execute(
            "UPDATE tb_transaksi SET nominal = %s, kategori = %s WHERE id_transaksi = %s",
            (nominal, kategori, id_transaksi)
        )
        flash("Perubahan berhasil disimpan.", "success")
        
    cursor.close()
    db.close()
    return redirect(url_for('index'))

@app.route('/hapus/<int:id>')
def hapus(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM tb_transaksi WHERE id_transaksi = %s", (id,))
    cursor.close()
    db.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)