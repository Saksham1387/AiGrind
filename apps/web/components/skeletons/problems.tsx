import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "@repo/ui/table";
const SkeletonTable = () => {
    const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index} className="animate-pulse">
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
      </TableRow>
    ));
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Solved</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{skeletonRows}</TableBody>
      </Table>
    );
  };

export default SkeletonTable;