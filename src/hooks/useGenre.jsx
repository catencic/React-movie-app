

export const useGenre = (selectedGenres) => {
 
    if(selectedGenres.length < 1) return ;

    const GenreIds = selectedGenres.map( g=> g.id);

    return GenreIds.reduce((acc,curr)=> acc + "," + curr);  //acumulador , valor actual


};

//exam   [1,2,3,4]
// results  1,2,3,4
