import {connect} from '../database';

export async function getCredentials(documentType:string, documentNumber:string): Promise<any>{
    const conn = await connect();
    const credentials= await conn.query('SELECT * FROM credentials WHERE user_id = (SELECT id FROM users WHERE document_type = ? AND document_number = ?)'
    ,[documentType, documentNumber]);
    return JSON.parse(JSON.stringify(credentials[0]))[0];
}