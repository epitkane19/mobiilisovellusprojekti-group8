import * as SQLite from 'expo-sqlite';
import { DbProps } from '../types/database';


export function Database({db, setDb}: DbProps)
{
    
    const initDB = async () => {  
    const database = await SQLite.openDatabaseAsync('JogAppDb1.db');
    setDb(database);

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS UserData (
          UserID INTEGER PRIMARY KEY AUTOINCREMENT,
          FirstName TEXT NOT NULL,
          LastName TEXT NOT NULL,
          Weight_Kg REAL NOT NULL CHECK (Weight_kg >= 0),
          Height_Cm REAL NOT NULL CHECK (Height_Cm >= 0),
          Age INTEGER NOT NULL CHECK (Age >= 0)
        );
        CREATE TABLE IF NOT EXISTS JogData (
          JogDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL, 
          length_Km REAL NOT NULL CHECK (length >= 0),
          Time_Minutes REAL NOT NULL CHECK (Time_Minutes >= 0),
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS GymData (
          GymDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL, 
          Rest_Time_Minutes INTEGER NOT NULL CHECK (Rest_Time_Minutes >= 0),
          Repetitions INTEGER NOT NULL CHECK (Repetitions > 0),
          Weight_Kg REAL NOT NULL CHECK (Weight_Kg > 0),
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );      
      `);

      loadUserData(database);
    };

    initDB();
}

const loadUserData = async (database: SQLite.SQLiteDatabase) => {
    const result = await database.getAllAsync('SELECT * FROM UserData ORDER BY UserID DESC');
    console.log("loaduserdata test")
    console.log(result)
  };
export const AddProfile = async (etuNimi: string, sukuNimi: string, ikä: string, paino: string, pituus: string, db: SQLite.SQLiteDatabase | null) => {
    
  if (!db) return;
    const result = await db.runAsync('INSERT INTO UserData (FirstName, LastName, Weight_Kg, Height_Cm, Age) VALUES (?,?,?,?,?)', etuNimi, sukuNimi, paino, pituus, ikä)
    
    const database = await SQLite.openDatabaseAsync('JogAppDb1.db');
    loadUserData(database)
  };
export const purgeDb = async() =>
{
  const database = await SQLite.openDatabaseAsync('JogAppDb1.db');
  await database.runAsync('DELETE FROM UserData')
}