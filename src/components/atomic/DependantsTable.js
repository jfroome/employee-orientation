import { Check, Close, Delete } from "@mui/icons-material";
import { Button, CircularProgress, FormLabel, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import TableCell from '@mui/material/TableCell';
import StyledTableCell from "./StyledTableCell";
import { Api_Insurance, Dental, Dependents_BirthDay, Dependents_Name, Dependents_Relation, Dependents_SSN, Dependents_Sex, Medical, Vision } from "../../constants";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DependantsTable({ dependants, setDependants, tableLoading, setTableLoading, coverageType }) {

    const handleDelete = async (idx) => {
        setTableLoading(true);
        const result = await axios(Api_Insurance);
        const newDeps = dependants;
        newDeps.splice(idx, 1)
        setDependants(newDeps);
        setTableLoading(false);
    }

    const [showTable, setShowTable] = useState(false)

    useEffect(() => {
        setShowTable(coverageType > 1 && coverageType < 5);
    }, [coverageType])

    return (
        !showTable ? <></> :
            <>
                <Grid item xs={12}>
                    {tableLoading ? <></> :
                        <>
                            <FormLabel>Dependents<br /></FormLabel>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 200 }} size="small" aria-label="Dependents Table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Relation</StyledTableCell>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell>Sex</StyledTableCell>
                                            <StyledTableCell>BirthDate</StyledTableCell>
                                            <StyledTableCell>S.S.N.</StyledTableCell>
                                            <StyledTableCell>Medical</StyledTableCell>
                                            <StyledTableCell>Vision</StyledTableCell>
                                            <StyledTableCell>Dental</StyledTableCell>
                                            <StyledTableCell>Remove</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody> {
                                        dependants.map((dependent, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {dependent[Dependents_Relation]}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dependent[Dependents_Name]}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dependent[Dependents_Sex]}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dependent[Dependents_BirthDay]}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dependent[Dependents_SSN]}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dependent[Medical] == true ? <Check /> : <Close />}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dependent[Vision] == true ? <Check /> : <Close />}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dependent[Dental] == true ? <Check /> : <Close />}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={(e) => handleDelete(index)}><Delete /></Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}</TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    }
                </Grid>
            </>
    )
}