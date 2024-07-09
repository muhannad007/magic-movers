import AddItemModel from "@/resources/add_item/add_item.model";
import Add from "@/resources/add_item/add_item.interface";

class AddItemService {
  private add = AddItemModel;

  public async create(item_name: string, item_weight: number): Promise<Add> {
    try {
      const addition = await this.add.create({
        item_name,
        item_weight,
      });
      // console.log(addition["_id"]);
      return addition;
    } catch (e) {
      throw new Error("Unable to add magic item");
    }
  }
}

export default AddItemService;
