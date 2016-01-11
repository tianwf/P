<table class="pi-list">
    <thead>
        {{#each field.items}}
        <th>{{text}}</th>
        {{/each}}
        {{#if_object field.button compare='object'}}
        <th>操作</th>
        {{/if_object}}
    </thead>
    <tbody></tbody>
    <tfoot>
        <tr>
            <td>
                <div class="checkAllContainer">
                    <input type="checkbox" />
                </div>
                <div class="buttons"></div>
                <div class="pagination"></div>
            </td>
        </tr>
        
    </tfoot>
</table>