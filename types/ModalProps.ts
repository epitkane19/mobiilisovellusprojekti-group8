import * as SQLite from 'expo-sqlite';

export type ProfiiliModalProps=
{
  modalVisible: boolean
  setModalVisible: (React.Dispatch<React.SetStateAction<boolean>>)
}

export type LuoProfiiliModalProps=
{
  modalVisible: boolean
  setModalVisible: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null
}