/* global kakao */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Provider, useSelector, useDispatch, connectm, shallowEqual } from "react-redux";

const Intro=()=>{
    

    useEffect(()=>{

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.4963124, 127.0368533), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };  

        
        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        function displayMarker(place,message) {
            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });
    
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }

        navigator.geolocation.getCurrentPosition((position) => {
        
            var lat = position.coords.latitude, // 위도
                lng = position.coords.longitude; // 경도
            
            // 마커와 인포윈도우를 표시합니다
            var mylocmarker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(lat, lng)
            });


            kakao.maps.event.addListener(mylocmarker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + "너님의 위치" + '</div>');
                infowindow.open(map, mylocmarker);
            });
            
            map.setCenter(new kakao.maps.LatLng(lat, lng));

            console.log(lat,lng)

        })
        
        
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});


        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(map); 

        // 카테고리로 음식점을 검색합니다
        ps.categorySearch('FD6', placesSearchCB, {
            useMapBounds:true,
            page : 3}); 

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        let list = [];
        
        function placesSearchCB (data, status, pagination) {
            console.log(pagination)
            if (status === kakao.maps.services.Status.OK) {
                pagination.prevPage()
                for (let i=0; i<data.length; i++){
                    displayMarker(data[i]);

                    console.log(data[i])
                    list.push(data[i])
                }     
                
                console.log(list.length)
                console.log(list)
            }
        }

        // 지도에 마커를 표시하는 함수입니다

    }, [])


            return (
                <div>
                <div id="map" style={{width:"500px", height:"400px"}}></div>
                
                </div>
            )
        }
    
    export default Intro;