import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import FunctionalBlockType from "../../types/FunctionalBlockType";
import ComponentType from "../../types/ComponentType";

interface Props {
  block: FunctionalBlockType
}

const BlockComponentsTable = ({block}: Props) => {

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const componentColumns = useMemo(
    () => [
      {
        accessorKey: 'type', 
        header: 'Type',
        
      },
      {
        accessorKey: 'value', 
        header: 'Value',
      },
      {
        accessorKey: 'footprints', 
        header: 'Footprints',
        Cell: ({ cell }: {cell: {getValue: () => string[]}}) => cell?.getValue()?.join(", "),
      },
      {
        accessorKey: 'cost', 
        header: 'Cost',
        size: 10,
        Cell: ({ cell }: {cell: {getValue: () => string}}) => USDollar.format(parseFloat(cell?.getValue())),
      },
     
    ],
    [],
  );

  const essentialComponentsTable = useMaterialReactTable({
    columns: componentColumns,
    data: block?.essentialParts || [],
    enableColumnOrdering: false, 
    enableRowSelection: false,
    enablePagination: true,
    enableDensityToggle: false,
    enableHiding: false,
  });

  const passiveComponentsTable = useMaterialReactTable({
    columns: componentColumns,
    data: block?.passives || [],
    enableColumnOrdering: false, 
    enableRowSelection: false,
    enablePagination: true,
    enableDensityToggle: false,
    enableHiding: false,
  });

  const getCostTotal = (componentList: ComponentType[]) => {
    return componentList.reduce((accumulator: number, currentValue: ComponentType) => accumulator + (currentValue?.cost || 0), 0);
  }

  return (  
    <div>
      <div className="table-group essentials">
        <h3>Essential ({block?.essentialParts?.length || 0})</h3>
        <MaterialReactTable table={essentialComponentsTable} />
        <div className="table-footer-row">
          <div className="cell">Subtotal</div>
          <div className="cell">{USDollar.format(getCostTotal(block?.essentialParts || []) || 0)}</div>
        </div>
      </div>

      <div className="table-group passives">
        <h3>Passive ({block?.passives?.length || 0})</h3>
        <MaterialReactTable table={passiveComponentsTable} />
        <div className="table-footer-row">
          <div className="cell">Subtotal</div>
          <div className="cell">{USDollar.format(getCostTotal(block?.passives || []) || 0)}</div>
        </div>
      </div>

      <div className="table-group total">
        <h3>Total </h3>
        <div className="table-footer-row">
          <div className="cell">{(block?.essentialParts?.length || 0) + (block?.passives?.length || 0) } Components</div>
          <div className="cell">{USDollar.format((getCostTotal(block?.essentialParts || []) || 0) + (getCostTotal(block?.passives || []) || 0))}</div>
        </div>
      </div>
    </div>
  );
}
 
export default BlockComponentsTable;