import ComponentType from "../../types/ComponentType";
import FunctionalBlockType from "../../types/FunctionalBlockType";


const componentCostReducer = (components: ComponentType[]) => {
  return components.reduce((acc: number, curr: ComponentType) => {
    return acc + (curr.cost || 0);
  }, 0.0);
}

export const costCalculator = (block: FunctionalBlockType) => {
  let totalCost = 0;
  if(block.essentialParts?.length) {
    totalCost += componentCostReducer(block.essentialParts);
  }
  if(block.passives?.length) {
    totalCost += componentCostReducer(block.passives);
  }

  return totalCost;
}