
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import Time from './time';

const FileList = ({files}) => (
    <table className='file-list'>
        <tbody>
            {files.map(file => (
                //key prop on the <tr> is required any time you render an array of elements. to tell components apart when reconciling differences during a re-render
                <FileListItem key={file.id} file={file}/>
                
            ))}
        </tbody>
    </table>
)
FileList.prototype = {
    files: PropTypes.array
};

const FileListItem = ({file}) => (
    <tr className='file-list-item'>
                {getFileName(file)}
                <CommitMessage commit={file.latestCommit}/>
                {/* div and span make the code reusable */}
                <div className='age'>
                    <Time time={file.updated_at}/>
                </div>
                </tr>
);

// const FileListItem = ({ file }) => (
//     <tr className="file-list-item">
//       <div><FileIcon file={file} /></div>
//       <div><FileName file={file} /></div>
//       <div><CommitMessage commit={file.latestCommit} /></div>
//       <div><Time time={file.updated_at} /></div>
//     </tr>
//   );

FileListItem.protoTypes = {
    file: PropTypes.object.isRequired
};

//the CommiMessage doesnt need to know about the file the fewer the components that have knowledge the better 
const CommitMessage = ({commit}) => (
    <div className='commit-message'>
        {commit.message}
    </div>
);
CommitMessage.propTypes ={
    commit: PropTypes.object.isRequired
}

function FileIcon({file}) {
    let icon = 'fa-file-text-o'
    if (file.type === 'folder') {
        icon = 'fa-folder'
    }
    return (
        <div>
            <i className={`fa ${icon}`}/>
        </div>
    )
}

FileIcon.propTypes = {
    file: PropTypes.object.isRequired
}

//We are inside a table row <tr> and we need two <div> next to each other but a true component cannot return a bare array without a wrapper
//you could also FileIcon and FileName as separate components each return <div> cell 
//the key is required because we are returning an array , and elements in an array must have a key
function getFileName(file){
    return[
        <FileIcon file={file} key={0}/>,
        <div className='file-name' key={1}>
            {file.name}
        </div>
    ]
}
const testFile = [
    {
        id: 1,
        name: 'React',
        type: 'folder',
        updated_at: '2019-04-10 20:30:00',
        latestCommit: {
            message: 'initial commit'
        }
    },
    {
        id: 2,
        name: 'React and Redux',
        type: 'folder',
        updated_at: '2019-04-10 20:30:00',
        latestCommit: {
            message: 'initial commit'
        }
    },
    {
        id: 3,
        name: 'README',
        type: 'file',
        updated_at: '2019-04-10 20:30:00',
        latestCommit: {
            message: 'added a read me'
        }
    }
]

ReactDOM.render(
    <FileList files={testFile}/>,
    document.getElementById('root')
)

//mapping over an array is how you render list things in REACT
//anytime you use map to render 
//keys should be stable, unique and permanent for each element in an array
/**stable - same key regardless of position
 * permanent - not change between renders
 * unique - no two elements have same key
 */