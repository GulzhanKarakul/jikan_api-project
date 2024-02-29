import React, { useState } from "react";
import styled from "styled-components";
import logo from '../assets/logo.png'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSearch } from 'react-icons/fa';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { setSearchingAnime } from "../store/animeSlice/animeSlice";



export default function Navbar({ isScrolled }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const links = [
        { name: 'Popular', link: '/' },
        { name: 'Airing', link: '/airing' },
        { name: 'Upcoming', link: '/upcoming' },
        { name: 'My List', link: '/mylist' },
    ];

    const [isLogged, setLogin] = useState(false);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        setLogin(!currentUser);
    });

    const handleLogInButton = () => {
        if (isLogged) {
            signOut(firebaseAuth);
        } else {
            navigate("/login");
        }
    };

    // Обработчик изменения значения в поле поиска
    const handleChange = (input) => {
        let name = input.split(' ').join("").toLowerCase()
        console.log(name)
        dispatch(setSearchingAnime(name));
    };

    return (
        <Container>
            <nav className={`flex ${isScrolled ? 'scrolled' : ""}`}>
                <div className="left flex a-center">
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className="links flex">
                        {isLogged ? (
                            links.map(({ name, link }) => (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            ))
                        ) : (
                            links.filter(({ link }) => link.trim() !== "/mylist").map(({ name, link }) => (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search show-search`}>
                        <button onClick={() => navigate(`/search`)}>
                            <FaSearch />
                        </button>
                        <input
                            type="text"
                            placeholder="Поиск"
                            onChange={(e) =>{
                                let input = e.target.value;
                                handleChange(input)
                            } }
                        />
                    </div>
                    <button onClick={handleLogInButton}>
                        {isLogged ? "Log Out" : "Log In"}
                    </button>
                </div>
            </nav>
        </Container>
    );
}
const Container = styled.div`
    .scrolled {
        background-color: #000;
    }
    nav {
        position: sticky;
        top: 0;
        height: 6.5rem;
        width: 100%;
        padding: 0 15px;
        justify-content: space-between;
        position: fixed;
        z-index: 2;
        align-items: center;
        transition: 300ms ease-in-out;
        .left {
            gap: 2rem;
            .brand {
                img {
                    height: 4rem;
                }
            }
            .links {
                list-style-type: none;
                gap: 2rem;
                li {
                    a {
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }
        .right {
            gap: 1rem;
            button:nth-child(1) {
                background-color: transparent;
                border: none;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
                svg {
                    color: #f34242;
                    font-size: 1.2rem;
                }
            }
            button:nth-child(2) {
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                border-radius: 0.2rem;
                font-weight: bolder;
                font-size: 1.05rem;
            }
            .search {
                display: flex;
                gap: 0.4rem;
                align-items: center;
                justify-content: center;
                padding: 0.2rem;
                padding-left: 0.5rem;
                button {
                    background-color: transparent;
                    svg {
                        color: #fff;
                    }
                }
                input {
                    width: 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: 300ms ease-in-out;
                    background-color: transparent;
                    border: none;
                    color: #fff;
                    &:focus {
                        outline: none;
                    }
                }
            }
            .show-search {
                border: 1px solid #fff;
                background-color: rgba(0, 0, 0, 0.6);
                input {
                    width: 100%;
                    opacity: 1;
                    visibility: visible;
                    padding: 0.3rem;
                }
            }
        }
    }
`;
