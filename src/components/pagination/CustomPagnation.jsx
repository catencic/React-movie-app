import { createTheme, ThemeProvider} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });


export const CustomPagnation = ({setPage , numberOfPages = 10}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
      };
    
  return (
    <div
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
        }}
        >
            <ThemeProvider theme={darkTheme}>
            <Pagination 
            onChange={(e) => handlePageChange(e.target.textContent)}
            count={numberOfPages} 
            hideNextButton
            hidePrevButton
            color="primary"
            />
              </ThemeProvider>
        
    </div>
  )
};
