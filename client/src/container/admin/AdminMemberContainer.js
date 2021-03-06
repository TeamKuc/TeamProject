import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { getUser, unloadUser, deleteMember, recoverMember } from '../../modules/admin';
import Member from '../../components/admin/Admin-member';

const AdminMemberContainer =()=>{
    const disPatch = useDispatch()
    const {userlist,member}=useSelector(({admin})=>({
        userlist:admin.userlist,
        member:admin.member
    }))
    useEffect(()=>{
        disPatch(getUser())
        return()=>{
            disPatch(unloadUser())
        }
    },[disPatch])

    useEffect(()=>{
        if(member){
            alert('완료 되었습니다')
            window.location.reload()
        }
    },[userlist,member])

    const userDelete =(id)=>{
        let DeleteCheck = window.confirm(`정말 회원 ${id}을 정지 하시겠습니까?`)
        if(DeleteCheck){
            disPatch(deleteMember(id))
            alert('정지되었습니다')
        }else{
            alert('취소되었습니다')
        }
    }
    
    const userRecover =(id)=>{
        let RecoverCheck = window.confirm(`정말 회원 ${id}을 복구 하시겠습니까?`)
        if(RecoverCheck){
            disPatch(recoverMember(id))   
            alert('정지되었습니다')
        }else{
            alert('취소되었습니다')
        }
    }

    return(
        <>
        <Member user={userlist} userDelete={userDelete} userRecover={userRecover}/>
        </>
    )
}

export default AdminMemberContainer