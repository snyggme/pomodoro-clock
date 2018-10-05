import React from 'react'

export const Control = (props) => {
  const handleClick = (e) => {
    if (!props.trigger) {
      if (e.target.id === props.incId)
        props.onClick(props.length + 1)
      else 
        props.onClick(props.length - 1)
    } 
  }
  return(
    <div className={props.name.toLowerCase().replace(/ length/, '-control')}>
      <div className='control-grid'>
        <div id={props.name.toLowerCase().replace(/ length/, '-label')} style={{gridColumn: '1/4'}}><h2>{props.name}</h2></div>
        <div onClick={handleClick} style={{justifySelf: 'flex-end', cursor: 'pointer'}}><i id={props.decId} className='fa fa-arrow-down fa-2x'/></div>
        <div id={props.name.toLowerCase().replace(/ /, '-')} style={{fontSize: '35px'}}>{props.length}</div>
        <div onClick={handleClick} style={{justifySelf: 'flex-start', cursor: 'pointer'}}><i id={props.incId} className='fa fa-arrow-up fa-2x'/></div>
      </div>
    </div>
  )
}