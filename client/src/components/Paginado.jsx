

export default function Paginado ({dogsPerPage, dogs, paginado}) {
    const pageNumbers = [];

    for(let i = 0; i <= Math.floor(dogs/dogsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (

        <nav>
            { pageNumbers.length ? pageNumbers.map(number => (
                <button onClick={()=> paginado(number)} key={number}> {number} </button>

            )) : <div> ... </div>}
        </nav>
        
    )

}