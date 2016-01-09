<table>
    <thead>
        {{#each field.items}}
        <th>{{text}}</th>
        {{/each}}
        {{#if_object field.button compare='object'}}
        <th>操作</th>
        {{/if_object}}
    </thead>
    <tbody></tbody>
    <tfoot></tfoot>
</table>