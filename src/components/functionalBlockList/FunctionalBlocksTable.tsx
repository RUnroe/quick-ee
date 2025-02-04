import {
  MaterialReactTable,
  MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import FunctionalBlockType, { DisplayFunctionalBlockType } from "../../types/FunctionalBlockType";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { costCalculator } from "../../util/common/costCalculator";
import { USDollar } from "../../util/common/stringFormatters";

interface Props {
  blocks: FunctionalBlockType[];
}

//WIP. Table for index page to display top level of functional components (name)

const FunctionalBlocksTable = ({ blocks }: Props) => {

  const [mappedBlocks, setMappedBlocks] = useState<DisplayFunctionalBlockType[]>([]);

  useEffect(() => {
    if(blocks) {
      mapBlocks();
    }
  }, [blocks]);

  const mapBlocks = () => {
    setMappedBlocks(blocks.map(block => ({
      ...block,
      totalCost: costCalculator(block),
      componentCount: (block?.essentialParts?.length || 0) + (block?.passives?.length || 0)
    })))
  }


  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Block",
      },
      {
        accessorKey: "componentCount",
        header: "# of Components",
      },
      {
        accessorKey: "boardArea",
        header: "Board Area",
      },
      {
        accessorKey: "totalCost",
        header: "Cost Estimate",
        Cell: ({ row }: { row: MRT_Row<DisplayFunctionalBlockType> }) => (
          <span>{row.original?.totalCost ? USDollar.format(row.original?.totalCost) : ''}</span>
        ),
      },
      {
        accessorKey: "powerRails",
        header: "Power Rails",
      },
      {
        accessorKey: "view",
        header: "",
        enableColumnFilter: false,
        enableColumnOrdering: false,
        enableSorting: false,
        enableColumnActions: false,

        Cell: ({ row }: { row: MRT_Row<FunctionalBlockType> }) =>
          blocks.indexOf(row.original) !== null ? (
            <div style={{ textAlign: "right" }}>
              <Link
                to={`/block/view/${blocks.indexOf(row.original)}`}
                className="button primary"
              >
                View
              </Link>
            </div>
          ) : (
            ""
        ),
      },
      // {
      //   accessorKey: 'footprints',
      //   header: 'Footprints',
      //   Cell: ({ cell }: {cell: {getValue: () => string[]}}) => cell?.getValue()?.join(", "),
      // },
      // {
      //   accessorKey: 'cost',
      //   header: 'Cost',
      //   size: 10,
      //   Cell: ({ cell }: {cell: {getValue: () => string}}) => USDollar.format(parseFloat(cell?.getValue())),
      // },
    ],
    []
  );

  const essentialComponentsTable = useMaterialReactTable({
    columns: columns,
    data: mappedBlocks || [],
    enableColumnOrdering: false,
    enableRowSelection: false,
    enablePagination: true,
    enableDensityToggle: false,
    enableHiding: false,
  });

  const globalTheme = useTheme();

  const theme = createTheme({
    palette: {
      mode: globalTheme.palette.mode,
      primary: {
        contrastText: "rgba(0, 0, 0, 0.87)",
        dark: "#6642f5",
        light: "#ac98f5",
        main: "#9e90f9",
      },

      background: {
        default: globalTheme.palette.mode === "light" ? "#f0f0f0" : "#000",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="table-group functional-blocks-table">
          <h3 className="sub-title">
            Functional Blocks ({blocks?.length || 0})
          </h3>
          <ThemeProvider theme={theme}>
            <MaterialReactTable table={essentialComponentsTable} />
          </ThemeProvider>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default FunctionalBlocksTable;
