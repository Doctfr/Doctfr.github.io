import React, { useState } from "react";
import AddressInput from "./AddressInput";
import {Moralis} from 'moralis'
import {useMoralisCloudFunction} from "react-moralis"




export default function Nouveaux() {

    const Input = () => {

        return (
            <div style={{width: "600px"}}>
                <input id="myInput" type="text" name="monAttribut" placeholder="Attribut"  />
                <input id="myInputdata" type="text" name="monAttributdata" placeholder="Valeur"/>
            </div>
        );
    };


    let [attributes, setAttributes] = useState([]);




    let [address, setAddress] = useState([]);
    let [nom, setNom] = useState([]);
    let [description, setDescription] = useState([]);
    let [photo, setPhoto] = useState([]);

    let [inputList, setInputList] = useState([]);

    const addInput = () => {
        setInputList(inputList.concat(<Input key={inputList.length}/>))
        console.log(address);

    };
    const supprimerInput = () => {
        inputList.pop();
        setInputList(inputList.concat())

    };

    const cloudf = useMoralisCloudFunction("setAlc", {
        address,
    });
    console.log(cloudf)
    cloudf

    async function saveNftModel() {

        attributes = attributes.target.parentElement.parentElement;
        let all =[]
        for (let index = 0; index < attributes.children.length; index++) {
            const attribut = attributes.children[index].children[0].value
            const valeur = attributes.children[index].children[1].value
            const obj = { 
                "trait_type":attribut, 
                "value":valeur
            }
            all.push(obj)
        }

        console.log(all);



        const NftModels = Moralis.Object.extend("Product");
        const nftModels = new NftModels();
        
        const name = nom.target.value+".png";
        const data = photo.target.files[0]

        const imageFile = new Moralis.File(name, data );
        imageFile.save()

        nftModels.set("nom", nom.target.value);
        nftModels.set("initialisateur", address);
        nftModels.set("description", description.target.value)
        nftModels.set("attribute", all)
        nftModels.set("file", imageFile);


        const params =  { ethAddress: address};
        console.log(await Moralis.Cloud.run("setAlc", params));
        const savingPerms = await Moralis.Cloud.run("setAlc", params);

        const acl = savingPerms;
        nftModels.setACL(acl)
        await nftModels.save();

        console.log("saved");
    }
  

    return (
        <div>
            <h1>🖼 Nouvel NFT</h1>
             <div style={{marginTop: "20px"}}>
                <p>Non du NFT:</p>
                <input type="text" className="form-control" id="nft-nom" placeholder="Nom du Nft" onChange={setNom}/>
                
                <p>Non du NFT:</p>
                <AddressInput
                autoFocus
                placeholder="Input your Address"
                onChange={setAddress}
                />;

                <textarea type="text" className="scroll" id="nft-description" onChange={setDescription}></textarea>

                <input type="file" id="nft-file" name="avatar"accept="image/png, image/jpeg" onChange={setPhoto}/>

                <div id="attributes">
                    <button onClick={addInput}>ajouter</button>
                    <button onClick={supprimerInput}>spprimer</button> 
                    <div onChange={setAttributes}>
                        {inputList}
                    </div>
                </div>
            </div>

            <button id="saveNftModel" onClick={saveNftModel}>crée le model nft</button>
            

        </div>
    );
    
}
