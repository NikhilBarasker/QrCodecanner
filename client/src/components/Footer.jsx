import React from 'react'

export default function Footer() {
  return (
    <div style={{
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        height: '45px',
        lineHeight: '45px',
    }}>
     &copy; Designed and Developed by <a href="">Royals Webtech</a>
    </div>
  )
}
