import { FormLabel, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import StyledTableCell from "./StyledTableCell";


export default function PriceTable() {
    return (
        <Grid item xs={8}>
            <FormLabel>Buy-Up Plan Pre Tax Cost</FormLabel>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} size="small" aria-label="Buy Up Plan Price Grid">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Type</StyledTableCell>
                            <StyledTableCell>Weekly Rate</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {'Employee'}
                            </TableCell>
                            <TableCell>
                                {'$29.06'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {'Employee + Spouse'}
                            </TableCell>
                            <TableCell>
                                {'$69.85'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {'Employee + Child(ren)'}
                            </TableCell>
                            <TableCell>
                                {'$58.55'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {'Employee + Family'}
                            </TableCell>
                            <TableCell>
                                {'$94.56'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}



