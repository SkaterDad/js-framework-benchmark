import { h } from './hyperapp'
import { actions } from './store'

export default ({ state }) => {
  return state.data.map(({ id, label }, i) => (
    <tr key={id} class={id === state.selected ? 'danger' : ''}>
      <td class="col-md-1">{id}</td>
      <td class="col-md-4">
        <a onclick={[actions.select, id]}>{label}</a>
      </td>
      <td class="col-md-1">
        <a onclick={[actions.delete, id]}>
          <span class="glyphicon glyphicon-remove" aria-hidden="true" />
        </a>
      </td>
      <td class="col-md-6" />
    </tr>
  ))
}
