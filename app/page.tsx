"use client";

import {useState} from "react";
import {FaPlay, FaPause} from "react-icons/fa6"

export default function Home() {

  const [tocando, setTocando] = useState(false);

  const sobClickMouse = () => {
    setTocando(!tocando);
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#C70039',
      textAlign: 'center',
    },
    containerProTextinho: {
      position: 'absolute',
      top: '20px',
      textAlign: 'center',
    },
    caixinha: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30vw',
      height: '30vh',
      backgroundColor: '#d3d3d3',
      borderRadius: '10px',
      textAlign: 'center',
    },
    estado: {
      marginBottom: '45px',
      fontSize: '30px',
      color: 'black',
    },
    botao: {
      fontSize: '36px',
      color: 'black',
    },
    textinho: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: 'white',
    }
  }

  return (
    <div style={styles.container}>
      {/* Para o textinho */}
      <div style={styles.containerProTextinho}>
        <h1 style={styles.textinho}>Neillinha</h1>
      </div>
      {/* Para o botão */}
      <div style={styles.caixinha}>
       <h1 style={styles.estado}>{tocando? 'Reproduzindo': 'Pausado'}</h1>
       <button style={styles.botao} onClick={sobClickMouse}>
        {tocando? <FaPause size={36}/>: <FaPlay size={36}/>}
       </button>
      </div>
    </div>
  );
}