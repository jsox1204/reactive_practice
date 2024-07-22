import PropTypes from 'prop-types';

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.string
}

function Button({onClick, children}) {
    return (
        <button onClick={event => {
            event.stopPropagation();
            onClick();
        }}>
            {children}
        </button>
    );
}

export default function Toolbar() {
    return (
        <div className="Toolbar" onClick={() => {
            alert("툴바 클릭!");
        }}>
            <Button onClick={() => alert("Playing!")}>
                Play Movie
            </Button>
            <Button onClick={() => alert("Uploading!")}>
                Upload Image
            </Button>
        </div>
    );
}