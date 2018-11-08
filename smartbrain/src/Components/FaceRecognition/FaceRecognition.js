import React from 'react';
import './FaceRecognition.css';


const FaceRecognition=({ Url, box })=> 	
{  
    return(
    	<div className='center ma'>
    		<div className='absolute mt' width='500px' height='auto'>
    			
    			<img id='inputimage' alt='' src={Url} />
    			
    			<div className='bounding-box' 
    				 style={{top: box.topRow, bottom:box.bottomRow, left:box.leftCol, right:box.rightCol}}>
    			</div>

    		</div>
    	</div>
    	);
}


export default FaceRecognition;
