"""
Migration script: Create pharmacies table and add dispensing columns to prescriptions.
Run with: python utils/migrate_pharmacy.py
"""
import os
import sys
import pymysql
from dotenv import load_dotenv

# Load environment from backend .env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1111')
DB_NAME = os.getenv('DB_NAME', 'HealthConnect_Live')


def run_migration():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
    cursor = conn.cursor()

    print(f"Connected to database: {DB_NAME}")
    print("-" * 50)

    # 1. Create pharmacies table
    print("[1/3] Creating 'pharmacies' table...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS pharmacies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            license_no VARCHAR(100),
            owner VARCHAR(255),
            pharmacist_in_charge VARCHAR(255),
            type VARCHAR(100),
            address TEXT,
            city VARCHAR(100),
            state VARCHAR(100),
            pincode VARCHAR(10),
            phone VARCHAR(20),
            mobile VARCHAR(20),
            website VARCHAR(255),
            gst_no VARCHAR(50),
            drug_license_no VARCHAR(100),
            operating_hours VARCHAR(255),
            services JSON,
            registration_date DATE,
            rating FLOAT DEFAULT 0.0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    print("    'pharmacies' table created (or already exists)")

    # 2. Add dispensed_at column to prescriptions table
    print("[2/3] Adding 'dispensed_at' column to prescriptions...")
    try:
        cursor.execute("ALTER TABLE prescriptions ADD COLUMN dispensed_at DATETIME NULL")
        print("    'dispensed_at' column added")
    except pymysql.err.OperationalError as e:
        if "Duplicate column name" in str(e):
            print("     'dispensed_at' column already exists, skipping")
        else:
            raise

    # 3. Add dispensed_by column to prescriptions table
    print("[3/3] Adding 'dispensed_by' column to prescriptions...")
    try:
        cursor.execute("""
            ALTER TABLE prescriptions ADD COLUMN dispensed_by INT NULL,
            ADD CONSTRAINT fk_dispensed_by_pharmacy 
            FOREIGN KEY (dispensed_by) REFERENCES pharmacies(id)
        """)
        print("    'dispensed_by' column added with FK to pharmacies")
    except pymysql.err.OperationalError as e:
        if "Duplicate column name" in str(e):
            print("     'dispensed_by' column already exists, skipping")
        else:
            raise

    conn.commit()
    cursor.close()
    conn.close()

    print("-" * 50)
    print(" Migration completed successfully!")


if __name__ == '__main__':
    try:
        run_migration()
    except Exception as e:
        print(f"\n Migration failed: {e}")
        sys.exit(1)
