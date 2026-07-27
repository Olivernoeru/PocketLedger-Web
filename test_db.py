import mysql.connector

try:
    # Membuka jalur komunikasi ke MySQL
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="",
        database="pocketledger_db"
    )
    
    if db.is_connected():
        print("[v] Sempurna! Python berhasil nembus ke pocketledger_db.")
        
except mysql.connector.Error as err:
    print(f"[!] Gagal terhubung ke database: {err}")