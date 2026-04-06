import config from '../config/config.js';
import { Client, ID, Databases, Storage, Query, Permission, Role  } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    normalizePostDocument(document){
        if (!document) return document
        return {
            ...document,
            featuredImage: document.featuredImage || document.featuredimage || null,
            userId: document.userId || document.userid || null,
        }
    }

    async createPost({title, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredimage: featuredImage,
                    status,
                    userid: userId,
                },
                [
                    Permission.read(Role.any()), 
                    Permission.write(Role.user(userId)),
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            const updatedDocument = await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage: featuredImage,
                    status,

                }
            )
            return this.normalizePostDocument(updatedDocument)
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            const document = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            
            )
            return this.normalizePostDocument(document)
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
                

            )
            return {
                ...response,
                documents: response.documents.map((document) => this.normalizePostDocument(document)),
            }
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file, userId){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
                [
                    Permission.read(Role.any()),
                    ...(userId ? [Permission.write(Role.user(userId))] : []),
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(
            config.appwriteBucketId,
            fileId
        ).toString()
    }
}


const service = new Service()
export default service