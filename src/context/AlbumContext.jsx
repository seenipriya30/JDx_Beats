import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { __DB } from '../backend/firebase';

export let AlbumContextAPI=createContext(null);

let AlbumContext = ({children}) => {

    let [allAlbums, setAllAlbums]= useState(null);
    let [searchTerm, setSearchTerm] = useState("");
    let [filteredAlbums, setFilteredAlbums] = useState(null);

    let fetchAlbumData = async()=>{
        try {
            let AlbumDataCollectionRef = collection(__DB,"album_Collections");
            let AlbumDataFromDB = await getDocs(AlbumDataCollectionRef);
            let AllAlbumsFromDB = AlbumDataFromDB?.docs.map((doc)=>({
                id:doc.id,
                ...doc?.data()
            }))
            setAllAlbums(AllAlbumsFromDB)
            setFilteredAlbums(AllAlbumsFromDB);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!allAlbums) return;
        if (searchTerm.trim() === "") {
            setFilteredAlbums(allAlbums);
        } else {
            const filtered = allAlbums.filter(album => 
                album.albumTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                album.albumLanguages.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredAlbums(filtered);
        }
    }, [searchTerm, allAlbums]);

    useEffect(()=>{
        fetchAlbumData();
    },[])

  return <AlbumContextAPI.Provider value={{allAlbums, filteredAlbums, searchTerm, setSearchTerm}}>
  {children}
  </AlbumContextAPI.Provider>
}

export default AlbumContext