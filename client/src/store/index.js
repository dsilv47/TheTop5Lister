import { Global } from '@emotion/react';
import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_LISTS: "LOAD_LISTS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        top5Lists: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        searchParam: "",
        sortParam: "publishNew"
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    top5Lists: payload.top5Lists,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchParam: store.searchParam,
                    sortParam: store.sortParam
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    top5Lists: store.top5Lists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchParam: store.searchParam,
                    sortParam: store.sortParam
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    top5Lists: store.top5Lists,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchParam: store.searchParam,
                    sortParam: store.sortParam
                })
            }
            // GET ALL THE LISTS
            case GlobalStoreActionType.LOAD_LISTS: {
                return setStore({
                    top5Lists: payload.top5Lists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchParam: payload.searchParam,
                    sortParam: payload.sortParam
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    top5Lists: store.top5Lists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    searchParam: store.searchParam,
                    sortParam: store.sortParam
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    top5Lists: store.top5Lists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchParam: store.searchParam,
                    sortParam: store.sortParam
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    top5Lists: store.top5Lists,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchParam: store.searchParam,
                    sortParam: store.sortParam
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    top5Lists: store.top5Lists,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    searchParam: store.searchParam,
                    sortParam: store.sortParam
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    top5Lists: store.top5Lists,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchParam: store.searchParam,
                    sortParam: store.sortParam
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    /*store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getLists() {
                        response = await api.getTop5Lists();
                        if (response.data.success) {
                            let top5Lists = response.data.top5Lists;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    top5Lists: top5Lists
                                }
                            });
                        }
                    }
                    getLists(top5List);
                    store.loadLists(store.searchParam, store.sortParam);
                }
            }
            updateList(top5List);
        }
    }*/

    store.changeListName = function (newName) {
        store.currentList.name = newName;
        store.updateCurrentList();
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            ownerUsername: auth.user.username,
            userLikes: [],
            userDislikes: [],
            usernameCommentPairs: [],
            viewCount: 0,
            published: false,
            isCommunity: false
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.loadLists = async function (searchParam, sortParam) {
        let mode = history.location.pathname.substring(1);
        const response = await api.getTop5Lists();
        if (response.data.success) {
            let top5Lists = response.data.data;
            if (mode === "") {
                top5Lists = top5Lists.filter((list) => list.ownerUsername === auth.user.username);
                if (searchParam !== "") {
                    top5Lists = top5Lists.filter((list) => list.name.indexOf(searchParam) === 0);
                }
            }
            else if (mode === "all") {
                top5Lists = top5Lists.filter((list) => list.published && (!list.isCommunity));
                if (searchParam !== "") {
                    top5Lists = top5Lists.filter((list) => list.name === searchParam);
                }
            }
            else if (mode === "users") {
                top5Lists = (searchParam === "") ? [] : top5Lists.filter((list) => list.published && list.ownerUsername === searchParam);
            }
            else if (mode === "community") {
                top5Lists = top5Lists.filter((list) => list.published && list.isCommunity);
                if (searchParam !== "") {
                    top5Lists = top5Lists.filter((list) => list.name.indexOf(searchParam) === 0);
                }
            }
            if (sortParam === "publishNew") {
                top5Lists.sort(function compare(a,b) {
                    if (a.published && b.published) {return new Date(b.publishDate) - new Date(a.publishDate)}
                    else if (a.published) {return -1}
                    else if (b.published) {return 1}
                    else {return 0}
                });
            }
            else if (sortParam === "publishOld") {
                top5Lists.sort(function compare(a,b) {
                    if (a.published && b.published) {return new Date(a.publishDate) - new Date(b.publishDate)}
                    else if (a.published) {return -1}
                    else if (b.published) {return 1}
                    else {return 0}
                });
            }
            else if (sortParam === "views") {
                top5Lists.sort((a, b) => b.viewCount - a.viewCount);
            }
            else if (sortParam === "likes") {
                top5Lists.sort((a, b) => b.userLikes.length - a.userLikes.length);
            }
            else if (sortParam === "dislikes") {
                top5Lists.sort((a, b) => b.userDislikes.length - a.userDislikes.length);
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_LISTS,
                payload: {
                    top5Lists: top5Lists,
                    searchParam: searchParam,
                    sortParam: sortParam
                }
            });
        }
        else {
            console.log("API FAILED TO LOAD LISTS");
        }
    }

    // THIS FUNCTION UPDATES OR CREATES A COMMUNITY LIST
    store.updateOrCreateCommunity = async function () {
        const response = await api.getTop5Lists();
        if (response.data.success) {
            let communityLists = response.data.data.filter((list) => list.isCommunity && list.name === store.currentList.name);
            if (communityLists.length === 1) {
                let communityList = communityLists[0];
                let items = store.currentList.items;
                let itemScorePairs = communityList.itemScorePairs;
                for (let i = 0; i < items.length; i++) {
                    let key = items[i];
                    let val = itemScorePairs[items[i]] ? itemScorePairs[items[i]] + (5-i) : (5-i);
                    itemScorePairs[key] = val;
                }
                communityList.itemScorePairs = itemScorePairs;
                communityList.publishDate = new Date().toISOString();
                const response2 = await api.updateTop5ListById(communityList._id, communityList);
                if (response2.data.success) {
                    store.loadLists(store.searchParam, store.sortParam);
                }
                else {
                    console.log("API FAILED TO UPDATE LIST");
                }
            }
            else {
                let items = store.currentList.items;
                let itemScorePairs = {};
                for (let i = 0; i < items.length; i++) {
                    let key = items[i];
                    let val = 5-i;
                    itemScorePairs[key] = val;
                }
                let payload = {
                    name: store.currentList.name,
                    items: ["?", "?", "?", "?", "?"],
                    ownerEmail: "COMMUNITY@COMMUNITY.COM",
                    ownerUsername: "COMMUNITY_LIST",
                    userLikes: [],
                    userDislikes: [],
                    usernameCommentPairs: [],
                    viewCount: 0,
                    published: true,
                    publishDate: new Date().toISOString(),
                    isCommunity: true,
                    itemScorePairs: itemScorePairs
                };
                const response2 = await api.createTop5List(payload);
                if (response2.data.success) {
                    store.loadLists(store.searchParam, store.sortParam);
                }
                else {
                    console.log("API FAILED TO CREATE A NEW LIST");
                }
            }
        }
        else {
            console.log("API FAILED TO GET TOP5LISTS");
        }
    }

    // THIS FUNCTION UPDATES OR CREATES A COMMUNITY LIST
    store.updateOrDeleteCommunity = async function () {
        const response = await api.getTop5Lists();
        if (response.data.success) {
            let communityLists = response.data.data.filter((list) => list.isCommunity && list.name === store.listMarkedForDeletion.name);
            let listsInvolved = response.data.data.filter((list) => (!list.isCommunity) && list.name === store.listMarkedForDeletion.name)
            if (listsInvolved.length > 1) {
                let communityList = communityLists[0];
                let items = store.listMarkedForDeletion.items;
                let itemScorePairs = communityList.itemScorePairs;
                for (let i = 0; i < items.length; i++) {
                    let key = items[i];
                    let val = itemScorePairs[items[i]] ? itemScorePairs[items[i]] - (5-i) : (5-i);
                    if (val === 0) {
                        delete itemScorePairs[key];
                    }
                    else {
                        itemScorePairs[key] = val;
                    }
                }
                communityList.itemScorePairs = itemScorePairs;
                communityList.publishDate = new Date().toISOString();
                const response2 = await api.updateTop5ListById(communityList._id, communityList);
                if (response2.data.success) {
                    store.loadLists(store.searchParam, store.sortParam);
                }
                else {
                    console.log("API FAILED TO UPDATE LIST");
                }
            }
            else {
                let communityList = communityLists[0];
                const response2 = await api.deleteTop5ListById(communityList._id);
                if (response2.data.success) {
                    store.loadLists(store.searchParam, store.sortParam);
                }
                else {
                    console.log("API FAILED TO UPDATE LIST");
                }
            }
        }
        else {
            console.log("API FAILED TO GET TOP5LISTS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadLists(store.searchParam, store.sortParam);
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.updateOrDeleteCommunity();
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            console.log("set the current list");
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    store.handleLike = async function (id) {
        const response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.userDislikes.indexOf(auth.user.email) !== -1) {
                top5List.userDislikes.splice(top5List.userDislikes.indexOf(auth.user.email), 1);
                top5List.userLikes.push(auth.user.email);
            }
            else if (top5List.userLikes.indexOf(auth.user.email) !== -1) {
                top5List.userLikes.splice(top5List.userLikes.indexOf(auth.user.email), 1);
            }
            else {
                top5List.userLikes.push(auth.user.email);
            }
            const response2 = await api.updateTop5ListById(id, top5List);
            if (response2.data.success) {
                store.loadLists(store.searchParam, store.sortParam);
            }
            else {
                console.log("API FAILED TO UPDATE TOP5LIST");
            }
        }
        else {
            console.log("API FAILED TO GET TOP5LIST");
        }
    }

    store.handleDislike = async function (id) {
        const response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.userLikes.indexOf(auth.user.email) !== -1) {
                top5List.userLikes.splice(top5List.userLikes.indexOf(auth.user.email), 1);
                top5List.userDislikes.push(auth.user.email);
            }
            else if (top5List.userDislikes.indexOf(auth.user.email) !== -1) {
                top5List.userDislikes.splice(top5List.userDislikes.indexOf(auth.user.email), 1);
            }
            else {
                top5List.userDislikes.push(auth.user.email);
            }

            const response2 = await api.updateTop5ListById(id, top5List);
            if (response2.data.success) {
                store.loadLists(store.searchParam, store.sortParam);
            }
            else {
                console.log("API FAILED TO UPDATE TOP5LIST");
            }
        }
        else {
            console.log("API FAILED TO GET TOP5LIST");
        }
    }

    store.handleComment = async function (id, comment) {
        const response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let pair = {
                username: auth.user.username, 
                comment: comment
            };
            top5List.usernameCommentPairs.push(pair);
            const response2 = await api.updateTop5ListById(id, top5List);
            if (response2.data.success) {
                store.loadLists(store.searchParam, store.sortParam);
            }
            else {
                console.log("API FAILED TO UPDATE TOP5LIST");
            }
        }
        else {
            console.log("API FAILED TO GET TOP5LIST");
        }
    }

    store.handleView = async function (id) {
        const response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.viewCount++;
            const response2 = await api.updateTop5ListById(id, top5List);
            if (response2.data.success) {
                store.loadLists(store.searchParam, store.sortParam);
            }
            else {
                console.log("API FAILED TO UPDATE TOP5LIST");
            }
        }
        else {
            console.log("API FAILED TO GET TOP5LIST");
        }
    }

    store.alreadyPublished = function (name) {
        let lists = store.top5Lists.filter((list) => list.published && list.name === name);
        return (lists.length !== 0);
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };