import axios from "axios";
import {NewsItem} from "../components/news/News";


const instance = axios.create({
    withCredentials: true,
    baseURL : 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"X-CMC_PRO_API_KEY" : "f241881c-1522-4b6d-a5a4-99a3960470cd"}

});


export const usersAPI = {
    getUsers(currentPage =1, pageSize =10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => { return  response.data})
    },
    follow(userID: number) {
        return instance.post(`follow/${userID}`,)
    },
    unfollow(userID: number){
        return instance.delete(`/follow/${userID}`,)
    },
    getProfile(userID: number){
        console.warn('Obsolete method. Please profileAPI object')
        return  profileAPI.getProfile(userID)
    },

}


export const profileAPI = {
    getProfile(userID: number){
        return  instance.get(`profile/` + userID)
    },
    getStatus(userID: number){
        return  instance.get(`profile/status/` + userID)
    },
    updateStatus(status: string){
        return  instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile:any){
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data' }})
    }

}
export const authAPI = {
    me(){
        return  instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean){
        return  instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return  instance.delete(`auth/login`)
    }
}
export const newsAPI = {
    setNews(){
        return axios.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=3fd36eac8b36479bb017949defda9df3', {withCredentials: true})
    }
}

