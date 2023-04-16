import React, { useState } from "react";
import {
  useContract,
  useNetwork,
  useNetworkMismatch,
  useAddress,
  useSDK,
  useCreateDirectListing,
  useCreateAuctionListing,
} from "@thirdweb-dev/react";
import { ChainId, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "../styles/Theme.module.css";
import {
  NFT_COLLECTION_ADDRESS,
} from "../const/contractAddresses";
const Create = () => {
  const address = useAddress();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const sdk = useSDK();

  const [creatingListing, setCreatingListing] = useState(false);

  const { contract: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    "nft-collection"
  );
  // const { contract: marketplace } = useContract(
  //   "0x4719c1737a69b50Ed303E01f7725Cc8aEd855Be1",
  //   "marketplace"
  // );

  // const { mutateAsync: makeDirectListing } =
  //   useCreateDirectListing(marketplace);
  // const { mutateAsync: makeAuctionListing } =
  //   useCreateAuctionListing(marketplace);

  // Other hooks
  const router = useRouter();
  const [file, setFile] = useState();
  const fileInputRef = useRef(null);

  // This function gets called when the form is submitted.
  async function handleCreateListing(e) {
    setCreatingListing(true);
    try {
      e.preventDefault();
      const { name, description } = e.target.elements;
      const img = await sdk.storage.upload(file);
      const metadata = {
        name: name.value,
        description: description.value,
        image: img,
      }
      const tx = await nftCollection.mintTo(address, metadata);

      const receipt = tx.receipt;
      const tokenId = tx.id;
      const nft = await tx.data();

      console.log(receipt, tokenId, nft);
      router.push("/");
  } catch (error) {
      console.log(error)
  }
  }

  const uploadFile = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();

      fileInputRef.current.onchange = () => {
        if (fileInputRef?.current?.files?.length) {
          const file = fileInputRef.current.files[0];
          setFile(file);
        }
      };
    }
  };

  return (
    <form onSubmit={(e) => handleCreateListing(e)}>
      <div className={styles.container}>
        {/* Form Section */}
        <div className={styles.collectionContainer}>
          <h1 className={styles.ourCollection}>
            Upload your NFT to the marketplace:
          </h1>

          {file ? (
            <img
              src={URL.createObjectURL(file)}
              style={{ cursor: "pointer", maxHeight: 250, borderRadius: 8 }}
              onClick={() => setFile(undefined)}
            />
          ) : (
            <div
              className={styles.imageInput}
              onClick={uploadFile}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setFile(e.dataTransfer.files[0]);
              }}
            >
              Drag and drop an image here to upload it!
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            id="profile-picture-input"
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          {/* Sale Price For Listing Field */}
          <input
            type="text"
            name="name"
            className={styles.textInput}
            placeholder="Name"
            style={{ minWidth: "320px" }}
          />

          {/* Sale Price For Listing Field */}
          <input
            type="text"
            name="description"
            className={styles.textInput}
            placeholder="Description"
            style={{ minWidth: "320px" }}
          />

          <button
            type="submit"
            className={styles.mainButton}
            style={{ marginTop: 32, borderStyle: "none" }}
            disabled={creatingListing}
          >
            {creatingListing ? "Loading..." : "Mint"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Create;