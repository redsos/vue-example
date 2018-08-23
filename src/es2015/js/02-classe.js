class Mesh {
  constructor(geometry, materials) {
    this.geometry = geometry;
    this.materials = materials;
  }

  update() {}
}

class Matrix4 {
  constructor(geometry, materials) {
  }
}

class SkinnedMesh extends Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new Matrix4();
  }
}

let skinnedMesh = new SkinnedMesh("a","b")
console.log(skinnedMesh);