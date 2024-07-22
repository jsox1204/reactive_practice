import PropTypes from 'prop-types';
import {useState} from 'react';

ProductCategoryRow.propTypes = {
    category: PropTypes.string
}

// 상품카테고리를 테이블에 행을 합쳐서 추가
function ProductCategoryRow({category}) {
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    );
}

ProductRow.propTypes = {
    product: PropTypes.object
}

function ProductRow({product}) {
    const name = product.stocked ? product.name :
        <span style={{color: 'red'}}>
            {product.name}
        </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

ProductTable.propTypes = {
    products: PropTypes.array
}

function ProductTable({products}) {
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                category={product.category}
                key={product.category} />
            );
        }
        rows.push(
            <ProductRow
            product={product}
            key={product.name} />
        );
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>가격</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

SearchBar.propTypes = {
    filterText: PropTypes.string,
    inStockOnly: PropTypes.bool,
    onFilterTextChange: PropTypes.func,
    onInStockOnlyChange: PropTypes.func
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
    return (
        <form>
            <input type="text" placeholder="검색..." value={filterText} onChange={event => onFilterTextChange(event.target.value)}/>
            <label>
                <input type="checkbox" value={inStockOnly} onChange={event => onInStockOnlyChange(event.target.value)}/>
                {' '}
                재고가 있는 상품만 표시
            </label>
        </form>
    );
}

FilterableProductTable.propTypes = {
    products: PropTypes.array
}

function FilterableProductTable({ products }) {

    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly} />
            <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
        </div>
    );
}

const PRODUCTS = [
    {category: "과일", price: "$1", stocked: true, name: "사과"},
    {category: "과일", price: "$1", stocked: true, name: "용과"},
    {category: "과일", price: "$2", stocked: false, name: "패션프루트"},
    {category: "야채", price: "$2", stocked: true, name: "시금치"},
    {category: "야채", price: "$4", stocked: false, name: "호박"},
    {category: "야채", price: "$1", stocked: true, name: "완두콩"}
];

export default function App2() {
    return <FilterableProductTable products={PRODUCTS} />
}