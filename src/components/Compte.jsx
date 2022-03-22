// import { Card, Timeline, Typography } from "antd";
import React, {useState} from "react";
import "CSS/Taille.css";
import "CSS/Compte.css";
import Account from "./Account/Account";
import { useMoralis } from "react-moralis";
import Info from "./Info.js"
import NFTBalance from "./NFTBalance.jsx"
import Init from "./Init.jsx"
import Nouveaux from "./Nouveaux.jsx"
import ListNft from "./ListNft.jsx"

// import Wallet from "./Wallet/Wallet.jsx"



// const styles = {
//   title: {
//     fontSize: "20px",
//     fontWeight: "700",
//   },
//   text: {
//     fontSize: "16px",
//   },
//   card: {
//     boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
//     border: "1px solid #e7eaf3",
//     borderRadius: "0.5rem",
//   },
//   timeline: {
//     marginBottom: "-45px",
//   },
// };
export default function Compte() {
  const { isAuthenticated, user, } = useMoralis();




  const styles = {
    container: {
      width: "70%",
      height: "100%",
      overflow: "hidden",
      marginTop: "75px",
    },
  };
  let [inputList, setInputList] = useState([<Info key ={0}/>]);

  function handleCLickInfos() {
    setInputList(inputList=[])
    setInputList(inputList.concat(<Info key={inputList.length} />));
    const items = document.getElementsByClassName("items");
    for (let index = 0; index < items.length; index++) {
      items[index].classList.toggle("click", false)
    }
    document.getElementById("info").classList.add("click")


    
  }


  
  const handleCLickNFTs = () => {
    setInputList(inputList=[])
    setInputList(inputList.concat(<NFTBalance key={inputList.length} />));
    const items = document.getElementsByClassName("items");
    for (let index = 0; index < items.length; index++) {
      items[index].classList.toggle("click", false)
    }
    document.getElementById("NFTs").classList.add("click")


  };

  function handleCLickPartenaire() {
    setInputList(inputList=[])
    const items = document.getElementsByClassName("items");
    for (let index = 0; index < items.length; index++) {
      items[index].classList.toggle("click", false)
    }
    document.getElementById("Partenaire").classList.add("click")
  }

  function handleCLickTransactions() {
    setInputList(inputList=[])
    const items = document.getElementsByClassName("items");
    for (let index = 0; index < items.length; index++) {
      items[index].classList.toggle("click", false)
    }
    document.getElementById("Transactions").classList.add("click")


    console.log(user.get("role"));
    console.log(user);
  }


  function handleCLickInit() {
    setInputList(inputList=[])
    setInputList(inputList.concat(<Init key={inputList.length} />));
    const items = document.getElementsByClassName("items");
    for (let index = 0; index < items.length; index++) {
      items[index].classList.toggle("click", false)
    }
    document.getElementById("NFTs-à-valider").classList.add("click")
  }

  function handleCLickNouveaux() {
    setInputList(inputList=[])
    setInputList(inputList.concat(<Nouveaux key={inputList.length} />));
    const items = document.getElementsByClassName("items");
    for (let index = 0; index < items.length; index++) {
      items[index].classList.toggle("click", false)
    }
    document.getElementById("Nouveaux").classList.add("click")
  }

  function handleCLickListNft() {
    setInputList(inputList=[])
    setInputList(inputList.concat(<ListNft key={inputList.length} />));
    const items = document.getElementsByClassName("items");
    for (let index = 0; index < items.length; index++) {
      items[index].classList.toggle("click", false)
    }
    document.getElementById("ListNft").classList.add("click")
  }
  












  if (isAuthenticated) {

    switch (user.get("role")) {        
      case "init":
        return (
          <div style={styles.container}>
      
            <div className="header disparaitreplus">
              <a id="info" className="items click" onClick={handleCLickInfos}>Vos Infos</a>
              <a id="NFTs" className="items" onClick={handleCLickNFTs}>Vos NFTs</a>
              <a id="Transactions" className="items" onClick={handleCLickTransactions}>Vos Transactions</a>
              <a id="NFTs-à-valider" className="items" onClick={handleCLickInit}>NFTs à Valider</a>
            </div>
      
            <div id="content">  {inputList}</div>
              
          </div>
        );
  
      case "admin":
        return (
          <div style={styles.container}>
      
            <div className="header disparaitreplus">
              <a id="info" className="items click" onClick={handleCLickInfos}>Utilisateurs</a>
              <a id="Nouveaux" className="items" onClick={handleCLickNouveaux}>Nouveaux nft</a>
              <a id="ListNft" className="items" onClick={handleCLickListNft}>Listes des NFTs en attente</a>
              <a id="Transactions" className="items" onClick={handleCLickTransactions}>Transactions</a>

            </div>
      
            <div id="content">  {inputList}</div>
      
          </div>
        );
    
      default:
        return (
          <div style={styles.container}>
      
            <div className="header disparaitreplus">
              <a id="info" className="items click" onClick={handleCLickInfos}>Vos Infos</a>
              <a id="NFTs" className="items" onClick={handleCLickNFTs}>Vos NFTs</a>
              <a id="Partenaire" className="items" onClick={handleCLickPartenaire}>Devenir Partenaire</a>
              <a id="Transactions" className="items" onClick={handleCLickTransactions}>Vos Transactions</a>
            </div>
      
            <div id="content">  {inputList}</div>
      
          </div>
        );
    }

    
  } else {
    return (
      <div style={styles.container} className="center">
        <h2 style={{marginBottom: "20px"}}>Bienvenue à RareWine</h2>
        <p style={{marginBottom: "20px" }}>Connecter vous en utilisant votre wallet Eth en cliquant en haut a droite ou ci-dessous, Si vous ne possédez pas de wallet créé en un</p>
        <a><Account /></a>
      </div>
    );

  }



  
}
