function Node(value, next = null) {
	if (value === undefined) throw new Error("Write the argument");
	this.value = value;
	this.next = next;
	return {
		value: this.value,
		next: this.next,
	};
}

export default class linkedList {
	constructor(...arg) {
		this.head = null;
		this.tail = null;
		this.size = 0;
		arg.forEach((el) => {
			this.append(el);
		});
	}

	append(arg) {
		const node = new Node(arg);
		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			this.tail = node;
		}

		this.size++;
	}

	prepend(arg) {
		const node = new Node(arg);
		if (this.head === null) {
			this.head = node;
			this.tail = node;
			return;
		}
		node.next = this.head;
		this.head = node;
		this.size++;
	}

	toString() {
		if (this.head === null) return "null";
		let string = `(${this.head.value}) -> `;
		let next = this.head.next;
		while (next !== null) {
			string += `(${next.value}) -> `;
			next = next.next;
		}
		return string + "null";
	}

	at(index, how = "v") {
		if (index >= 0 || index === undefined) {
			if (index >= this.size) throw new Error("Out of range");
		} else {
			if (index < -this.size) throw new Error("Out of range");
		}
		if (this.head === null) return null;

		let cur = this.head;
		let num = 0;
		if (index < 0) {
			index += this.size;
		}
		while (num !== index) {
			cur = cur.next;
			num++;
		}
		return how !== "v" ? cur : cur.value;
	}

	pop() {
		if (this.head === null) return null;
		if (this.size > 1) {
			this.tail = this.at(-2, "node");
		} else {
			const removed = this.at(-1, "node");
			this.tail = null;
			this.head = null;
			this.size = 0;
			this.size--;
			return removed;
		}
		const next = this.tail.next;
		this.tail.next = null;
		this.size--;
		return next;
	}

	contains(value) {
		if (this.head === null || value === undefined) return false;
		let cur = this.head;
		while (cur !== null) {
			if (cur.value === value) return true;
			cur = cur.next;
		}
		return false;
	}

	find(value) {
		if (this.head === null || value === undefined) return null;
		let cur = this.head;
		let count = 0;
		while (cur !== null) {
			if (cur.value === value) return count;
			cur = cur.next;
			count++;
		}
		return null;
	}

	insertAt(value, index) {
		if (index === 0) return this.prepend(value);
		if (index === this.size) return this.append(value);
		if (index < 0) throw new Error("Out of Range");
		const node = new Node(value);
		const tailNode = this.at(index, "node");
		const headNode = this.at(index - 1, "node");
		headNode.next = node;
		node.next = tailNode;
		this.size++;
	}

	removeAt(index) {
		if (index < 0 || index >= this.size) throw new Error("Out of Range");
		if (index === this.size - 1) return this.pop();
		if (index === 0) {
			this.head = this.head.next;
			this.size--;
			return;
		}

		const node = this.at(index, "node");
		const nodeTail = this.at(index + 1, "node");
		const headNode = this.at(index - 1, "node");

		headNode.next = nodeTail;
		node.next = null;

		this.size--;
		return node;
	}
}
