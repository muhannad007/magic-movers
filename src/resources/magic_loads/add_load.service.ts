import loadModel from "@/resources/magic_loads/add_load.model";
import Load from "@/resources/magic_loads/add_load.interface";

class LoadService {
  private add = loadModel;

  public async create(
    items: object,
    mover_id: number,
    carry_weight: number,
    weight_limit: number,
  ): Promise<Load> {
    try {
      const load = await this.add.create({
        items,
        mover_id,
        carry_weight,
        weight_limit,
      });
      // console.log(addition["_id"]);
      return load;
    } catch (e) {
      throw new Error("Unable to load magic items");
    }
  }
}

export default LoadService;
