// import { } from "antd";
import {Card, Image, Tooltip, Skeleton } from "antd";
import {useMoralisQuery} from "react-moralis"
import {
    FileSearchOutlined,
    SendOutlined,
  } from "@ant-design/icons";
import {Moralis} from "moralis";
const web3 = require('web3');
const web3js = new web3(web3.givenProvider);






export default function Init() {
    const nft_contract_address = "0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431";
    


    const { Meta } = Card;
    const styles = {
        NFTs: {
          display: "flex",
          flexWrap: "wrap",
          WebkitBoxPack: "start",
          justifyContent: "flex-start",
          margin: "0 auto",
          maxWidth: "1000px",
          width: "100%",
          gap: "10px",
        },
      };

      async function publierNFT(nft){
    


    
    
    
        const attribut = nft.attributes.attribute
        const imgsrc= nft.attributes.file._url
        let file = 0;
        const nom = nft.attributes.nom+"png";
        fetch(imgsrc)
        .then(res => res.blob())
        .then(async blob => {
          file = new File([blob], nom, blob)
    
    
          const imageFile = new Moralis.File(file.name, file);
          await imageFile.saveIPFS();
          const imageURI = imageFile.ipfs();
            
         console.log(attribut);
          const metadata = {
            "name":nft.attributes.nom,
            "description":nft.attributes.description,
            "image": imageURI,
            "attributes":attribut
          }
          console.log(metadata);
    
        
        const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
        await metadataFile.saveIPFS();
        const metadataURI = metadataFile.ipfs();
        console.log(metadataFile);
        console.log(metadataURI); //{"name":"vin3","description":"vin","image":"https://ipfs.moralis.io:2053/ipfs/QmcPojkFgVxEQSeruPVw6zduway88Sye3aHzaqwQ9EhFJX","attributes":"[{\"trait_type\":\"ann�e\",\"value\":\"ann�e\"},{\"trait_type\":\"propiet�\",\"value\":\"propiet�\"},{\"trait_type\":\"vigne\",\"value\":\"vigne\"}]"}
        await mintToken(metadataURI).then(notify(imgsrc))
    
        })
    }
    
        async function mintToken(_uri){
    
          const encodedFunction = web3js.eth.abi.encodeFunctionCall({
            name: "mintToken",
            type: "function",
            inputs: [{
              type: 'string',
              name: 'tokenURI'
              }]
          }, [_uri]);
    
          const transactionParameters = {
            to: nft_contract_address,
            from: window.ethereum.selectedAddress,
            data: encodedFunction
          };
          const txt = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters]
          });
          return txt
        }
    
        async function notify(imgsrc){
          
        console.log("nft minted");
          
        const NftModels = Moralis.Object.extend("Product");
        let nftModels = new Moralis.Query(NftModels)
    
        let result = await nftModels.find();
    
        for (let index = 0; index < result.length; index++) {
    
          if (result[index].get("file")._url==imgsrc) {
            //result[index].destroy();
            break;
          }
          
        }
          
        } 





    const { data, error, isLoading } = useMoralisQuery("Product");
    if (error) {
        console.log(error);
    }
    
    if (isLoading) {
    return <div>wait</div>
    }
    return (
        <div style={{ padding: "15px", maxWidth: "1030px", width: "100%" }}>
            <h1>🖼 NFT Balances</h1>
            <div style={styles.NFTs}>
            <Skeleton loading={isLoading}>

                {data.map((nft, index) => { 
                    console.log(nft);
                    console.log(nft.attributes.nom)

                    return (
                        <Card
                        hoverable
                        actions={[
                        <Tooltip title="A revoir">
                            <FileSearchOutlined
                            onClick={() =>
                                console.log("A revoir")
                            }
                            />
                        </Tooltip>,
                        <Tooltip title="Publier">
                            <SendOutlined onClick={() => publierNFT(nft)} />
                        </Tooltip>,
                        ]}
                        style={{ width: 240, border: "2px solid #e7eaf3" }}
                        cover={
                        <Image
                            preview={false}
                            src={nft.attributes.file._url}
                            fallback="data:image/png;base64,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"
                            alt=""
                            style={{ height: "300px" }}
                        />
                        }
                        key={index}
                    >
                        <Meta title={nft.attributes.nom} description={nft.attributes.description} />
                    </Card>
                        )
                    })
                }
                </Skeleton>
            </div>
        </div>

    );

    
    
  
}
