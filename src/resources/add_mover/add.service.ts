import AddModel from "@/resources/add_mover/add.model";
import Add from "@/resources/add_mover/add.interface";

class AddService {
  private add = AddModel;

  public async create(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    weight_limit: number,
    energy: number,
    quest_state: string,
  ): Promise<Add> {
    try {
      const addition = await this.add.create({
        first_name,
        last_name,
        email,
        password,
        weight_limit,
        energy,
        quest_state,
      });
      // console.log(addition["_id"]);
      return addition;
    } catch (e) {
      throw new Error("Unable to add magic mover");
    }
  }
}

export default AddService;
