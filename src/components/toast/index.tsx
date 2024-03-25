import './index.scss'

type SnackBarProps = {
    message: string,
    open: boolean,
    onClose: () => void
}

const SnackBar = ({message, onClose, open}: SnackBarProps) => {
    return (
        <>
            {open && 
            <div className='SnackBar_Container'>
                <div>{message}</div>
                <div onClick={onClose}>
                    X
                </div>
            </div>}
        </> 
    )
}

export default SnackBar