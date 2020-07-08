function roll(min, max, floatFlag){
	let r= Math.random();
	let n= r*(max-min) + min;
	return floatFlag ? n : Math.floor(n);
}
function Nprice(qty, price) {
	return qty*price;
}

function totalTaxes(tax, netPrice){
	return tax/100*netPrice;
}

function grossPrice(netPrice, netTax){
	return parseFloat(netPrice)+parseFloat(netTax);
}

let allProducts=["🍇","🍈","🍉","🍊","🍋","🍌","🍍","🥭","🍎","🍏","🍐","🍑","🍒","🍓","🥝","🍅","🥥","🥑","🍆","🥔","🥕","🌽","🌶","🥒","🥬","🥦","🧄","🧅","🍄","🥜","🌰","🍞","🥐","🥖","🥨","🥯","🥞","🧇","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🥙"];

let products=[...Array(roll(1,10,0))].map((_,i)=>{
	let p=roll(1,10,1).toFixed(2);
	let q= roll(1,6,0);
	let t= roll(14,20,1).toFixed(2);
	let np= Nprice(q, p).toFixed(2);
	let nt= totalTaxes(t, np).toFixed(3);
	let ttl= grossPrice(np, nt).toFixed(3);

	return{
		Sr: i+1,
		item: allProducts[roll(0,allProducts.length,0)],
		price: p,
		Qty: q,
		weight: roll(10,50,1).toFixed(2),
		tax: t,
		netPrice:np,
		netTax: nt,
		total: ttl
	}
});

let sum= products.reduce(function(acc, pro){
	return acc+parseFloat(pro.netPrice)+parseFloat(pro.netTax);
}, 0);

let weight= products.reduce(function(acc, pro){
	return acc+parseFloat(pro.weight);
}, 0);

//console.log(sum);
let productsElement= document.getElementById("prod");
let productsTotal= document.getElementById("totaled");
let productsWeight= document.getElementById("weighted");

let cart=`<tr>
			<th>Serial</th>
			<th>Item</th>
			<th>Price(per qty)</th>
			<th>Total Qty</th>
			<th>Weight</th>
			<th>Tax rate</th>
			<th>Net price</th>
			<th>Total taxes</th>
			<th>Price(including taxes)</th>
		</tr>`

products.forEach(function(product){
	cart+= `<tr>
				<td>${product.Sr}</td>
				<td>${product.item}</td>
				<td>Rs. ${product.price}</td>
				<td>${product.Qty}</td>
				<td>${product.weight} lbs</td>
				<td>${product.tax}%</td>
				<td>Rs. ${product.netPrice}</td>
				<td>Rs. ${product.netTax}</td>
				<td>Rs. ${product.total}</td>
			</tr>`;
});

let cartTotal=`Total price: ${sum.toFixed(2)}`;
let cartWeight=`Total Packet weight: ${weight.toFixed(3)} lbs`;
productsElement.innerHTML= cart;
productsTotal.innerHTML= cartTotal;
productsWeight.innerHTML= cartWeight;