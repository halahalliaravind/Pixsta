import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () =>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

useEffect(()=>{
    if(url){
          uploadFields()
    }
},[url])

    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-aravind-clone")
        data.append("cloud_name","instagram-clone-aravind")
        fetch("	https://api.cloudinary.com/v1_1/instagram-clone-aravind/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email Entered",classes:"#c62828 red darken-3"})
            return 
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message,classes:"#43a047 green darken-1"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2>Pixsta</h2>
                <input 
                    type="text"
                    placeholder="Name"
                    value = {name}
                    onChange = {(e)=>setName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Email"
                    value = {email}
                    onChange = {(e)=>setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                <span>Upload Profile</span>
                <input 
                    type="file" 
                    onChange={(e)=>setImage(e.target.files[0])}
                    />
            </div>
            <div class="file-path-wrapper">
            <input type="text" className="file-path validate" />
      </div>
    </div>
                <button className="btn signin waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >
                    SignUp
                </button>
                <div className="check-btn">
                    <Link to="/signin"><h6>Already have an account? <span>Sign In</span></h6></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;