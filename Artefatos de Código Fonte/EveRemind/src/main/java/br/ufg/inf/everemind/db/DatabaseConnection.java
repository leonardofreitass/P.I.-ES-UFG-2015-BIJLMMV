/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package br.ufg.inf.everemind.db;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import java.net.UnknownHostException;

/**
 *
 * @author Leonardo
 */
public class DatabaseConnection {
    
    
    /**
     * Define com qual banco de dados o programa vai fazer conexão,
     * ela pode ser 'local' par aum banco de dados na própria maquina 'localhost',
     * ou 'heroku' para conectar com o banco de dados do MongoLab do Heroku.
     * Para desenvolvimento local, usar sempre 'local'.
     */
    private final static String connection = "local";

    private DatabaseConnection(){}
    
    private static MongoDatabase localConnection() throws UnknownHostException{
       MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
       MongoDatabase database = mongoClient.getDatabase("everemind");
       return database;
    }
    
    private static MongoDatabase herokuConnection() throws UnknownHostException{
        MongoClientURI connectionString = new MongoClientURI("");
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase database = mongoClient.getDatabase("");
        return database;
    }

    public static synchronized MongoDatabase create() throws UnknownHostException{
        if (connection.equals("heroku"))
            return herokuConnection();
        
        return localConnection();
    }
}
