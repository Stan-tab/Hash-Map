import linkedList from "./linkedList.js";
import murmur3 from "./murmur3.js";

class hashMap {
	constructor() {
		this.buckets = [];
		this.loadFactor = 0.75;
		this.capacity = 0;
		this.size = 16;
	}

	Node(key, value) {
		return { key, value };
	}

	set(key, value) {
		if (typeof key !== "string") return;
		if (this.size * this.loadFactor <= Math.ceil(this.capacity))
			this.reorganizer();
		const hashCode = murmur3(key) % this.size;
		const element = this.Node(key, value);
		const place = this.buckets[hashCode];
		if (!place) {
			const list = new linkedList(element);
			this.buckets[hashCode] = list;
			this.capacity++;
			return;
		}
		for (let i = 0; i < place.size; i++) {
			if (element.key === place.at(i).key) {
				place.at(i).value = element.value;
				return;
			}
		}

		place.append(element);
		this.capacity++;
	}

	get(key) {
		const check = this.find(key);
		if (check === null) return null;
		return this.buckets[check[0]].at(check[1]).value;
	}

	find(key) {
		const hashCode = murmur3(key) % this.size;
		if (!this.buckets[hashCode]) return null;
		const list = this.buckets[hashCode];
		for (let i = 0; i < list.size; i++) {
			const node = list.at(i);
			if (node.key === key) return [hashCode, i];
		}
		return null;
	}

	has(key) {
		const hashCode = murmur3(key) % this.size;
		if (!this.buckets[hashCode]) return false;
		const list = this.buckets[hashCode];
		for (let i = 0; i < list.size; i++) {
			const node = list.at(i);
			if (node.key === key) return true;
		}
		return false;
	}

	reorganizer() {
		console.log("Not realized yet");
	}

	entries() {
		if (this.buckets.length === 0) return null;
		const accum = [];
		for (let i = 0; i < this.size; i++) {
			if (!this.buckets[i]) continue;
			for (let j = 0; j < this.buckets[i].size; j++) {
				accum.push({
					key: this.buckets[i].at(j).key,
					value: this.buckets[i].at(j).value,
				});
			}
		}
		return accum;
	}

	keys() {
		if (this.buckets.length === 0) return null;
		const accum = [];
		for (let i = 0; i < this.size; i++) {
			if (!this.buckets[i]) continue;
			for (let j = 0; j < this.buckets[i].size; j++) {
				accum.push(this.buckets[i].at(j).key);
			}
		}
		return accum;
	}

	values() {
		if (this.buckets.length === 0) return null;
		const accum = [];
		for (let i = 0; i < this.size; i++) {
			if (!this.buckets[i]) continue;
			for (let j = 0; j < this.buckets[i].size; j++) {
				accum.push(this.buckets[i].at(j).value);
			}
		}
		return accum;
	}

	clear() {
		this.buckets = [];
		this.capacity = 0;
		this.size = 16;
	}

	remove(key) {
		const position = this.find(key);
		if (position === null) return null;
		const node = this.buckets[position[0]].at(position[1]); 
		this.buckets[position[0]].removeAt(position[1]);
		return node;
	}
}

const test = new hashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("lion", "rainbow");
// console.log(test.find("lion"));

// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries())
// console.log(test.remove("banana"))
// console.log(test.entries())
