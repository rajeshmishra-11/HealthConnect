"""
Seed script: Create a test pharmacy user for login testing.
Run with: python utils/seed_pharmacy.py
"""
import os
import sys
import pymysql
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash

# Load environment from backend .env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1111')
DB_NAME = os.getenv('DB_NAME', 'HealthConnect_Live')


def seed_pharmacy():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
    cursor = conn.cursor()

    print(f"Connected to database: {DB_NAME}")
    print("-" * 50)

    # Check if the pharmacy user already exists
    cursor.execute("SELECT id FROM pharmacies WHERE email = %s", ("pharmacy@healthconnect.com",))
    existing = cursor.fetchone()

    if existing:
        print("  Pharmacy user 'pharmacy@healthconnect.com' already exists (ID: {})".format(existing[0]))
        print("   Skipping seed. Use this to login:")
        print("   Email: pharmacy@healthconnect.com")
        print("   Password: password123")
    else:
        password_hash = generate_password_hash("password123")

        cursor.execute("""
            INSERT INTO pharmacies (
                name, email, password_hash, license_no, owner, 
                pharmacist_in_charge, type, address, city, state, 
                pincode, phone, mobile, website, gst_no, 
                drug_license_no, operating_hours, services, 
                registration_date, rating
            ) VALUES (
                %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s,
                %s, %s, %s,
                %s, %s
            )
        """, (
            "City Medical Store",
            "pharmacy@healthconnect.com",
            password_hash,
            "PH-MH-2024-00451",
            "Rajesh Kumar",
            "Dr. Meena Sharma (Regd. No: MPC-45892)",
            "Retail Pharmacy",
            "Shop No. 12, Ground Floor, Sunrise Complex, MG Road, Pune - 411001",
            "Pune",
            "Maharashtra",
            "411001",
            "+91 20 2567 8901",
            "+91 98765 43210",
            "www.citymedicalstore.in",
            "27AABCU9603R1ZM",
            "MH-20B-123456 / MH-21B-654321",
            "Mon-Sat: 8:00 AM - 10:00 PM | Sun: 9:00 AM - 2:00 PM",
            '["Prescription Dispensing", "OTC Medicines", "Health Supplies", "Home Delivery", "Digital RX Verification"]',
            "2018-06-15",
            4.8
        ))

        conn.commit()
        print("  Pharmacy user created successfully!")
        print("")
        print("   Login Credentials:")
        print("   Email:    pharmacy@healthconnect.com")
        print("   Password: password123")

    cursor.close()
    conn.close()

    print("-" * 50)
    print(" Seed completed!")


if __name__ == '__main__':
    try:
        seed_pharmacy()
    except Exception as e:
        print(f"\n Seed failed: {e}")
        sys.exit(1)
