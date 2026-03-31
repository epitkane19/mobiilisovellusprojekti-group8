import * as SQLite from 'expo-sqlite';

export type DbProps=
{
  db: SQLite.SQLiteDatabase | null
  setDb: (React.Dispatch<React.SetStateAction<SQLite.SQLiteDatabase | null>>)
  setUserData: (React.Dispatch<React.SetStateAction<UserData[]>>)
  setUserWeight: (React.Dispatch<React.SetStateAction<UserWeight[]>>)
}

export type UserData = 
{
  FirstName: string
  LastName: string
  Height_Cm: number
  Age: number
  UserID: number
}
export type UserWeight = 
{
  Weight_Kg: number
  Date: string
  UserID: number
}
