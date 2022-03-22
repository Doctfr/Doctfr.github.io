import {React } from 'react'
// import Address from './Address/Address'
import "CSS/Taille.css";
import "CSS/Compte.css";
import { useMoralis } from "react-moralis"
// import { useMoralisWeb3Api } from "react-moralis";


export default function Info() {

    const {  userError, user } = useMoralis();

    console.log(user.get("role"));
    // const { token } = useMoralisWeb3Api();
    return (
        <div>
            <div>
                <h1>🖼 Vos Infos</h1>
                <div className="infos">
                    <p style={{fontWeight: "bold"}}>Eth Addresse:</p>
                    <p>{user.get("ethAddress")}</p>
                    {/* <Address avatar copyable size="8"  /> */}
                </div>
                <div className="infos">
                    <p style={{fontWeight: "bold"}} >Address Email:</p>
                    <p>not def yet</p>
                </div>
                <div className="infos">
                    <p style={{fontWeight: "bold"}} >Nom:</p>
                    <p>not def yet</p>
                </div>
          </div>
        <div>
        {/* <p>{token}</p> */}
            {userError && <p>{userError.message}</p>}
            
            <pre>
            {JSON.stringify(user)}
            </pre>
        
            <button >
            Refetch user data
            </button>
        </div>
    </div>
    );
}
