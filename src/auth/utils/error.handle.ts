
const handleHttp = (res:Response|any, message: string | any, statusCode:number, errorRaw?:any)=>{
    console.log(errorRaw)
    res.status(statusCode)
    res.send(message)
}
export { handleHttp}