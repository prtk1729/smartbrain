import React from 'react';
import './ImageLink.css'


const ImageLink=({ onInputChange,onButtonClick})=> 	
{  
    return ( 
    <div>
    	<p className='f3 center'>
    		{'This Magic Brain will detect faces in your pictures.Give it a try '}
    	</p>

    	<div className='center'>

    		<div className='pa4 br3 shadow-5 form center'>
	    		<input className='f4 pa2 w-70' 
	    		type='text' 
	    		onChange={onInputChange} />

	    		<button
	    			className='w-30 f4 grow ph3 dib bg-light-purple white pv2 link'
	    			onClick={onButtonClick}>
	    			Detect
	    		</button>
	    	</div>

    	</div>
    </div>
    );
}

export default ImageLink;

