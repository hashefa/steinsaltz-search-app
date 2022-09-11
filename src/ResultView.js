import React from "react";
import InnerHTML from 'dangerously-set-html-content'

// export default ({ result }) => (
//   <li className="sui-result">
//     <div className="sui-result__body">
//     <li>
        
//           <span 
//             className="sui-result__name"
//             dangerouslySetInnerHTML={{
//               __html: result.uniqueFileName.snippet
//             }}
//             style={{
//                 maxWidth: "140px",
//                 paddingLeft: "24px",
//                 paddingTop: "10px"
//               }}
            
//           />
//         <ul className="sui-result__details">
//         <li>
//           <span
//             className="sui-result__value"
//             dangerouslySetInnerHTML={{
//               __html: result.content.snippet
//             }}
//           />
//         </li>
        
//       </ul>

//         </li>

//     </div>
    
//   </li>
// );



const ResultView = (props) => {
    const { result } = props;

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }

    return (
        <li className="sui-result">
            <a  href="#" 
                onClick={() => openInNewTab(result.file_path.raw)}
                className="sui-result__name"
                
            >
            {<InnerHTML     
                html={result.uniqueFileName.snippet}
                style={{
                    paddingLeft: "24px",
                  
                }} />
                }
            </a>
            
            <ul className="sui-result__details">
                <li>
                    <span className="sui-result__value">{
                        <InnerHTML html={result.content.snippet} />
                
                                         }
                    </span>
                </li>
            </ul>
            
      </li>
    )
}

export default ResultView;