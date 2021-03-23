import axios from "axios";
import {PhotosType, ProfileType, User2Type} from "../redux/store";

const instance = axios.create({
    withCredentials: true,
    baseURL : 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY" : "e24193c6-db40-4e93-ac6a-c1798a7670fd"}

});

type getItemsType = {
    items: Array<User2Type>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage =1, pageSize =10, term: string='') {
        return instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
            .then(response => { return  response.data})
    },
    follow(userID: number) {
        return instance.post<ResponseType>(`follow/${userID}`,)
            .then(res => res.data)
    },
    unfollow(userID: number){
        return instance.delete(`/follow/${userID}`,).then(res => res.data) as Promise<ResponseType>
    },
    getProfile(userID: number){
        return  profileAPI.getProfile(userID)
    },

}

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userID: number){
        return  instance.get<ProfileType>(`profile/` + userID)
            .then(res => res.data)
    },
    getStatus(userID: number){
        return  instance.get<string>(`profile/status/` + userID)
    },
    updateStatus(status: string){
        return  instance.put<ResponseType>(`profile/status`, {status: status})
    },
    savePhoto(photoFile: File){
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<SavePhotoResponseType>>('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data' }})
    },
    saveProfile(profile: any){
        return  instance.put<ResponseType>(`profile`, profile)
    }

}

export enum ResultCodes {
    Success = 0,
    Error= 1
}
type ResponseType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number | ResultCodes
}
type MeResponseType = {
        id: number
        email: string
        login: string
}
type LoginResponseType = {
        userId: number
}

export const authAPI = {
    me(){
        return  instance.get<ResponseType<MeResponseType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean){
        return  instance.post<ResponseType<LoginResponseType>>(`auth/login`, {email, password, rememberMe}).then(res => res.data)
    },
    logout(){
        return  instance.delete(`auth/login`)
    }
}

export const newsAPI = {

    setNews(){
        return axios.get(`https://newsapi.org/v2/top-headlines?country=ru&apiKey=3fd36eac8b36479bb017949defda9df3`,
            // {headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*", }}
        )
    },
    setValues(){
      return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true', )
    }
}
