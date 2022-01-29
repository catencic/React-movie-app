import { createTheme, ThemeProvider} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });


export const CustomPagnation = ({setPage , numOfPages = 10 }) => {

  
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
            count={(numOfPages > 500) ? 500 : numOfPages } 
            hideNextButton
            hidePrevButton
            color="primary"
            />
              </ThemeProvider>
        
    </div>
  )
};
